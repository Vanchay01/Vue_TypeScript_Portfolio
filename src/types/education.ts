export interface Education  {
    id: number,
    name: string,
    major: string,
    gpa: string,
    date_start: string,
    date_end:  string,
    created_at: string,
    logo: string | null
    degres: []
}

export interface EducationFrom{
    name: string,
    major: string,
    gpa: string,
    date_start: string,
    date_end: string,
    logo: File | null
}
