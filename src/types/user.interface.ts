interface UserLegs {
  user_id: number;
}

interface UserProps {
  firstname: string;
  middlename?: string;
  lastname: string;
  email: string;
  mobile_number: string;
  gender: 'male' | 'female';
  age: string;
  role: 'admin' | 'customer' | 'support';
  password: string;
  upline: string;
  legs?: UserLegs[];
}

export default UserProps;
