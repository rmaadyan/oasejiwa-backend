import { Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {
    protected async getTracker(req: Record<string, any>): Promise<string> {
        const ip = req.headers['x-forwarded-for'] ?? req.ip ?? 'unknown';
        const email = req.body?.email ?? '';
        return `${ip}-${email}`;
    }
}