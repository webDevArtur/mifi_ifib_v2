import {z} from 'zod';

import {RegistrationResponseSchema} from './registrationResponse';
import {ConfirmRegistrationResponseSchema} from './confirmRegistrationResponse';
import {AuthResponseSchema} from './authResponse';

export type RegistrationResponse = z.infer<typeof RegistrationResponseSchema>;
export type ConfirmRegistrationResponse = z.infer<typeof ConfirmRegistrationResponseSchema>;
export type AuthResponse = z.infer<typeof AuthResponseSchema>;


