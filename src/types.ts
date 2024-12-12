
export const STATUS_VALUES = ['В работе', 'Просрочена', 'Выполнена', 'Есть отзыв'] as const;

export type StatusType = typeof STATUS_VALUES[number];

export interface RequestDataType {
  id: string;
  number: number;
  createdDate: string;
  controlDate: string;
  completionDate?: string;
  system: string;
  requestType: string;
  object: {
    name: string;
    city: string;
    street: string;
  };
  text: string;
  status: StatusType;
  isTechnological: boolean;
  files?: string[];
}
  