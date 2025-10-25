import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface LoginScreenProps {
  loginNick: string;
  loginPassword: string;
  setLoginNick: (value: string) => void;
  setLoginPassword: (value: string) => void;
  onLogin: () => void;
}

export default function LoginScreen({
  loginNick,
  loginPassword,
  setLoginNick,
  setLoginPassword,
  onLogin,
}: LoginScreenProps) {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <Card className="glass-card p-8 max-w-md w-full space-y-6 animate-scale-in">
        <h1 className="text-3xl font-bold text-center gradient-text">froz1kecs</h1>
        <div className="space-y-4">
          <div>
            <label className="text-sm opacity-70 mb-2 block">Ник</label>
            <Input
              value={loginNick}
              onChange={(e) => setLoginNick(e.target.value)}
              className="bg-white/5 border-white/10"
              placeholder="Введите ник"
            />
          </div>
          <div>
            <label className="text-sm opacity-70 mb-2 block">Пароль</label>
            <Input
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              className="bg-white/5 border-white/10"
              placeholder="Введите пароль"
            />
          </div>
          <Button onClick={onLogin} className="w-full">
            Войти
          </Button>
        </div>
      </Card>
    </div>
  );
}
