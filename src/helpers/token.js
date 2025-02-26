import { cookies } from 'next/headers'

export default async function Cookie(cookie) {
    const cookieToken = await cookies()
    cookieToken.set('token', cookie, {
        maxAge: 60 * 60 * 24 * 7,
    })
    const token = cookieToken.get('token')
    return token;
}