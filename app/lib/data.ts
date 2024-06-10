import { sql } from '@vercel/postgres';
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  InvoiceWithCustomer,
  User,
  Revenue,
  InvoiceSearchParams,
} from './definitions';
import { PrismaClient, InvoiceStatus } from '@prisma/client';
import { formatCurrency } from './utils';

const prisma = new PrismaClient();

export async function fetchMonthlyRevenue() {
  // テストの為に遅くしてる
  await new Promise((resolve) => setTimeout(resolve, 1500));
  try {
    return await prisma.revenue.findMany({
      where: {
        userId: '410544b2-4001-4271-9855-fec4b6a6442a', // FIXME: ログインを実装したら修正
      },
      orderBy: {
        month: 'asc',
      },
      take: 12,
    });
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the monthly revenue.');
  }
}
export async function fetchLatestInvoices(): Promise<InvoiceWithCustomer[]> {
  // テストの為に遅くしてる
  await new Promise((resolve) => setTimeout(resolve, 1000));
  try {
    return await prisma.invoice.findMany({
      include: {
        customer: true,
      },
      take: 5,
    });
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData() {
  try {
    const customerCountPromise = prisma.customer.findMany();
    const invoiceCountPromise = prisma.invoice.findMany();
    const pendingInvoicePromise = prisma.invoice.findMany({
      where: {
        status: InvoiceStatus.Pending,
      },
    });
    const paidInvoicePromise = prisma.invoice.findMany({
      where: {
        status: InvoiceStatus.Paid,
      },
    });

    const data = await Promise.all([
      customerCountPromise,
      invoiceCountPromise,
      pendingInvoicePromise,
      paidInvoicePromise,
    ]);

    const numberOfCustomers = data[0].length;
    const numberOfInvoices = data[1].length;
    const totalPendingInvoices = data[2].reduce(
      (total, invoice) => total + invoice.amount,
      0,
    );
    const totalPaidInvoices = data[3].reduce(
      (total, invoice) => total + invoice.amount,
      0,
    );

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

export const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const invoices = await prisma.invoice.findMany({
      where: {
        customer: {
          'OR': [
            {
              name: {
                contains: query,
              },
            },
            {
              email: {
                contains: query,
              },
            },
          ],
        },
      },
      include: {
        customer: true,
      },
      skip: offset,
      take: ITEMS_PER_PAGE,
      orderBy: {
        date: 'desc',
      },
    });

    return invoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesTotalPageCount(query: string) {
  try {
    const invoices = await prisma.invoice.findMany({
      where: {
        customer: {
          'OR': [
            {
              name: {
                contains: query,
              },
            },
            {
              email: {
                contains: query,
              },
            },
          ],
        },
      }
    });

    return invoices.length;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
  try {
    const data = await sql<InvoiceForm>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.rows.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));

    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchCustomers() {
  try {
    const data = await sql<CustomerField>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    const customers = data.rows;
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  try {
    const data = await sql<CustomersTableType>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

    const customers = data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}

export async function getUser(email: string) {
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
