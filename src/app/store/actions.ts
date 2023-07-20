import { createAction, props } from "@ngrx/store";
import { IUser } from "../interface/user.interface";

export const setUser = createAction('[User] Set User', props<{ user: IUser }>);
export const clearUser = createAction('[User] Clear User');
