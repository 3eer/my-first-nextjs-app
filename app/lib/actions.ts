'use server';

import { z } from 'zod';
import { InvoiceStatus, PrismaClient } from '@prisma/client';
import { InvoiceSchema } from '@/prisma/zod/schemas';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const prisma = new PrismaClient();

export type InvoiceFormState = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

const InvoiceFormSchema = InvoiceSchema.extend({
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than 0.' }),
  status: z.enum([InvoiceStatus.Paid, InvoiceStatus.Pending], {
    invalid_type_error: 'Please select an invoice status.',
  }),
});

const CreateInvoice = InvoiceFormSchema.omit({
  id: true,
  date: true,
  createdAt: true,
  updatedAt: true,
});
const UpdateInvoice = InvoiceFormSchema.omit({
  id: true,
  date: true,
  createdAt: true,
  updatedAt: true,
});

export async function createInvoice(
  prevState: InvoiceFormState,
  formData: FormData,
): Promise<InvoiceFormState> {
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

  try {
    const { customerId, amount, status } = validatedFields.data;
    await prisma.invoice.create({
      data: {
        customerId: customerId,
        amount: amount,
        status: status as InvoiceStatus,
        date: new Date(),
      },
    });
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
  try {
    await prisma.invoice.update({
      where: {
        id: id,
      },
      data: {
        customerId: customerId,
        amount: amount,
        status: status as InvoiceStatus,
      },
    });
  } catch (error) {
    return {
      message: 'Database Error: Failed to Update Invoice.',
    };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  try {
    await prisma.invoice.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    return {
      message: 'Database Error: Failed to Delete Invoice.',
    };
  }

  revalidatePath('/dashboard/invoices');
}
