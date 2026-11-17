import { NextResponse } from 'next/server';
import { assertServerAdmin } from '@/lib/adminAuth';

export async function GET(req: Request) {
  const adminCheck = await assertServerAdmin(req, '/api/admin/session');
  if (!adminCheck.authorized) {
    return NextResponse.json(
      {
        isAdmin: false,
        error: adminCheck.error || 'Não autorizado.',
      },
      { status: adminCheck.status }
    );
  }

  return NextResponse.json({
    isAdmin: true,
    method: adminCheck.method,
    userId: adminCheck.userId,
    email: adminCheck.email,
  });
}
