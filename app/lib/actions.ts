'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { PrismaClient } from '@prisma/client';
import { InvoiceSchema } from '@/prisma/zod/schemas';

const CreateInvoice = InvoiceSchema.omit({ id: true, date: true, createdAt: true, updatedAt: true });
const UpdateInvoice = InvoiceSchema.omit({ id: true, date: true, createdAt: true, updatedAt: true });
const prisma = new PrismaClient();

export async function createInvoice(formData: FormData) {
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
    }
  });

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
  await prisma.invoice.update({
    where: {
      id: id
    },
    data: {
      customerId: customerId,
      amount: amount,
      status: status,
    },
  });

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  await prisma.invoice.delete({
    where: {
      id: id
    },
  });
  revalidatePath('/dashboard/invoices');
}
