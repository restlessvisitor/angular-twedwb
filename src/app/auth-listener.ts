export interface AuthListener {
  notifyUserChanged(userId: string) : void;
}