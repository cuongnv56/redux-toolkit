export const fakeAuthProvider = {
    isAuthenticated: false,
    username: null,
    async signIn(username) {
      await new Promise((r) => setTimeout(r, 500)); // fake delay
      fakeAuthProvider.isAuthenticated = true;
      fakeAuthProvider.username = username;
    },
    async signOut() {
      await new Promise((r) => setTimeout(r, 500)); // fake delay
      fakeAuthProvider.isAuthenticated = false;
      fakeAuthProvider.username = "";
    },
}