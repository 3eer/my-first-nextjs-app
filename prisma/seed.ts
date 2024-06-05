import bcrypt from 'bcrypt';
import { PrismaClient, InvoiceStatus } from '@prisma/client';
import {
  users,
  customers,
  invoices,
  userRevenue,
} from '../app/lib/placeholder-data.js';

const prisma = new PrismaClient();
const createUsers = async function() {
  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return await prisma.user.upsert({
        where: { email: user.email },
        update: {},
        create: {
          id: user.id,
          email: user.email,
          name: user.name,
          password: hashedPassword,
        }
      });
    }),
  );

  console.log(`Seeded ${insertedUsers.length} users`);
};

const createCustomers = async function() {
  const insertedCustomers = await Promise.all(
    customers.map(async (customer) => {
      return await prisma.customer.upsert({
        where: { email: customer.email },
        update: {},
        create: {
          id: customer.id,
          email: customer.email,
          name: customer.name,
          imageUrl: customer.image_url,
        }
      });
    }),
  );

  console.log(`Seeded ${insertedCustomers.length} customers`);
};

const createInvoices = async function() {
  const insertedInvoices = await Promise.all(
    invoices.map(async (invoice) => {
      return await prisma.invoice.create({
        data: {
          customerId: invoice.customer_id,
          amount: invoice.amount,
          status: invoice.status === "pending" ? InvoiceStatus.Pending : InvoiceStatus.Paid,
          date: new Date(invoice.date),
        }
      });
    }),
  );

  console.log(`Seeded ${insertedInvoices.length} invoices`);
};

const createUserRevenue = async function() {
  const insertedUserRevenue = await Promise.all(
    userRevenue.map(async (revenue) => {
      return await prisma.revenue.upsert({
        where: {
          userId_month: {
            userId: revenue.user_id,
            month: revenue.month,
          }
        },
        update: {},
        create: {
          userId: revenue.user_id,
          month: revenue.month,
          revenue: revenue.revenue,
        }
      });
    }),
  );

  console.log(`Seeded ${insertedUserRevenue.length} revenue`);
};

async function main() {
  await createUsers();
  await createCustomers();
  await createInvoices();
  await createUserRevenue();
};

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
