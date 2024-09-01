type UserType = {
    id: number;
    student_id: string;
    email: string;
    grade: number;
    field_of_interest: string;
    labo_id: number;
    created_at?: Date;
    liked_labos?: number[];
};

export default UserType;