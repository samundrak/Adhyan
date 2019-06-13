import { Disposable } from '../../interfaces';

class AuthDisposal implements Disposable {
  item: () => void;
  constructor(item: () => void) {
    this.item = item;
  }
  dispose() {
    this.item();
  }
}
export default AuthDisposal;
