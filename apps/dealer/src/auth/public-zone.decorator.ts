import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'publicZone';
export const PublicZone = () => SetMetadata(IS_PUBLIC_KEY, true);
