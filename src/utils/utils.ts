
import { ILoggerService } from 'app/services/logger/main/logger.service.interface';
import { Dimensions, Platform, ScaledSize } from 'react-native';


export function isNil(value: unknown): value is null | undefined {
    return value === undefined || value === null;
}

/* Async */

export function doWithCatch<T>(loggerService: ILoggerService, ...promises: Promise<T>[]): void {
    promises.forEach((promise: Promise<T>) => promise.catch((e: Error) => loggerService.error(e)));
}

/* Enums */

export function enumFromValue<T extends Record<string, string | number>>(
    val: string | number,
    _enum: T
): T[keyof T] | null {
    const enumName = (Object.keys(_enum) as Array<keyof T>).find((k: keyof T) => _enum[k] === val);
    return enumName ? _enum[enumName] : null;
}

/* Device */

export function isIOS(): boolean {
    return Platform.OS === 'ios';
}

export function isAndroid(): boolean {
    return Platform.OS === 'android';
}

export function getScreenSize(): ScaledSize {
    return Dimensions.get('screen');
}

export function getScreenWidth(): number {
    return getScreenSize().width;
}

export function getScreenHeight(): number {
    return getScreenSize().height;
}

/* Phone */

export function normalizeUSAPhone(phone: string): string {
    return `${phone.startsWith('+1') ? '+' : '+1'}${phone.replace(/^(\+)|[^\d\n]/g, '')}`;
}



export function delay(ms: number): Promise<unknown> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

