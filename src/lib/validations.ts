import { z } from 'zod';

export const TransactionSchema = z.object({
    type: z.enum(['income', 'expense']),
    amount: z.coerce.number().positive('Amount must be positive'),
    categoryId: z.string().min(1, 'Category ID is required'),
    description: z.string().min(1, 'Description is required').max(500),
    date: z.coerce.date().optional(), // API might not send date (defaults to now)
});

export const EventSchema = z.object({
    title: z.string().min(1, 'Title is required').max(200),
    description: z.string().max(2000).optional().default(''),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    location: z.string().max(300).optional(),
    maxVolunteers: z.coerce.number().int().nonnegative().optional(),
}).refine(data => data.endDate >= data.startDate, {
    message: 'End date must be after start date',
    path: ['endDate'],
});

export const DonationSchema = z.object({
    donorName: z.string().max(255).optional(),
    donorEmail: z.string().email('Invalid email format').optional().or(z.literal('')),
    amount: z.coerce.number().positive('Amount must be positive'),
    isAnonymous: z.boolean().optional().default(false),
    message: z.string().max(1000).optional(),
});

export const DocumentSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    category: z.string().min(1, 'Category is required'),
    fileUrl: z.string().url('Invalid file URL'),
    fileSize: z.coerce.number().int().nonnegative(),
});

export const AssetSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    category: z.string().min(1, 'Category is required'),
    condition: z.enum(['excellent', 'good', 'fair', 'poor']),
    location: z.string().optional(),
    value: z.coerce.number().nonnegative().optional(),
    notes: z.string().optional(),
    imageUrl: z.string().url().optional().or(z.literal('')),
});

export const LoginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});
