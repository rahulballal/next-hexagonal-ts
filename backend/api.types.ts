import { IChore } from "./domain.types"

interface GenericResponse<T> {
    data: T
}

export type SingleChore = GenericResponse<IChore>
export type ManyChores = GenericResponse<Array<IChore>>