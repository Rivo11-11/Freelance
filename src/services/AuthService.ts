
class AuthService {

    async initiateSignup (method: string, value: string) {
       // const result = await authService.initiateSignup(method, value);
       
   };
   
   async verifySignup (method: string, value: string, code: string) {
       // const verified = await authService.verifySignup(method, value, code);
       
   };
   
   async completeSignup (name: string, email: string, phone: string, password: string, profileImage: string) {
       // const token = await authService.completeSignup({ name, email, phone, password, profileImage });
       
   };
   
   async signin (method: string, value: string, password: string) {
       // const token = await authService.signin(method, value, password);
       
   };
   
}

export default new AuthService();