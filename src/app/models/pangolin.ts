export class Pangolin {
  name!: string;
  password!: string;
  pangolinId?: string; //String to interact with localStorage
  friends!: string[];
  role!: 'Guerrier' | 'Alchimiste' | 'Sorcier' | 'Espion' | 'Enchanteur';
}
