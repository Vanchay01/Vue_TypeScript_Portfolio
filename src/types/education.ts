export interface Education  {
    id: number,
    name: string,
    major: string,
    gpa: string,
    date_start: string,
    date_end:  string,
    created_at: string,
    logo: string | null
    degree: Degree[]
}

export interface Degree {
    id: number,
    originalname: string,
    filename: string,
    path: string,
    size: number,
    encoding: string,
    created_at: string,
    by_education: number
}

export interface EducationFrom{
    name: string,
    major: string,
    gpa: string,
    date_start: string,
    date_end: string,
    logo: File | null | undefined
}

export interface DegreeForm{
    by_education: number | null | undefined,
    images: File | string | null | undefined
}

export interface EducationUpdate  {
    name: string,
    major: string,
    gpa: string,
    date_start: string,
    date_end:  string,
    created_at: string,
    logo: File | string | null | undefined
}