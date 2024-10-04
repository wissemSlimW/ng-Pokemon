import { Model } from './model';

export interface Pokemon extends Model {
  name: string;
  image: string;
  type: number;
  power: number;
  life: number;
}
