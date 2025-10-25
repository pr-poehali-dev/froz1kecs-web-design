import { Card } from '@/components/ui/card';
import { Task, User } from '../types';

interface HomeSectionProps {
  currentUser: User | null;
  tasks: Task[];
}

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 6) return 'Доброй ночи';
  if (hour < 12) return 'Доброе утро';
  if (hour < 18) return 'Добрый день';
  return 'Добрый вечер';
};

export default function HomeSection({ currentUser, tasks }: HomeSectionProps) {
  const userTasks = tasks.filter(t => t.tag === currentUser);
  const completedCount = userTasks.filter(t => t.completed).length;
  const exclusiveTask = userTasks.find(t => t.exclusive);

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-4xl font-bold gradient-text">
        {getGreeting()}, {currentUser}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass-card p-6">
          <p className="text-sm opacity-70 mb-2">Задач</p>
          <p className="text-3xl font-bold">{userTasks.length}</p>
        </Card>
        <Card className="glass-card p-6">
          <p className="text-sm opacity-70 mb-2">Выполнено задач</p>
          <p className="text-3xl font-bold">{completedCount}</p>
        </Card>
        <Card className="glass-card p-6">
          <p className="text-sm opacity-70 mb-2">Эксклюзивное задание</p>
          <p className="text-lg font-semibold gradient-text">{exclusiveTask?.title || 'Нет'}</p>
        </Card>
      </div>
    </div>
  );
}
