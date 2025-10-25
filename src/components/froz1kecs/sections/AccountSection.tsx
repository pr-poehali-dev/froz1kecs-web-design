import { Card } from '@/components/ui/card';
import { User, userData } from '../types';

interface AccountSectionProps {
  currentUser: User | null;
}

export default function AccountSection({ currentUser }: AccountSectionProps) {
  if (!currentUser) return null;
  const user = userData[currentUser];

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-3xl font-bold gradient-text">Аккаунт</h2>
      <Card className="glass-card p-6 space-y-4">
        <div>
          <p className="text-sm opacity-70">Ник</p>
          <p className="text-xl font-semibold">{user.nick}</p>
        </div>
        <div>
          <p className="text-sm opacity-70">Привилегия</p>
          <p className="text-xl font-semibold">{user.privilege}</p>
        </div>
        <div>
          <p className="text-sm opacity-70">Роль</p>
          <p className="text-xl font-semibold">{user.role}</p>
        </div>
        <p className="text-xs opacity-50 mt-4">
          Информация об аккаунтах не обновляется в реальном времени, изменения вносятся только после обновления. При несоответствиях - сообщите администратору
        </p>
      </Card>
    </div>
  );
}
