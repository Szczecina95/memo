export interface Note {
    id: string;
    title: string;
    description: string;
    createdAt: string;
}

export type DebouncedFunction<T extends (...args: any[]) => any> = 
  (...args: Parameters<T>) => void;