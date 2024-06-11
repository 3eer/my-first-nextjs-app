'use server';

import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import { InvoiceSchema } from '@/prisma/zod/schemas';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const CreateInvoice = InvoiceSchema.omit({
  id: true,
  date: true,
  createdAt: true,
  updatedAt: true,
});
const UpdateInvoice = InvoiceSchema.omit({
  id: true,
  date: true,
  createdAt: true,
  updatedAt: true,
});
const prisma = new PrismaClient();

export async function createInvoice(formData: FormData) {
  try {
    const { customerId, amount, status } = CreateInvoice.parse({
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    });

    await prisma.invoice.create({
      data: {
        customerId: customerId,
        amount: amount,
        status: status,
        date: new Date(),
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return error.errors;
    }

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
        status: status,
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
