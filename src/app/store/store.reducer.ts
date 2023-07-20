import { createReducer, on } from "@ngrx/store";
import { IUser } from "../interface/user.interface";

import { setUser, clearUser } from "./actions";
import { state } from "@angular/animations";

export const initialUserState: IUser | null = null;

