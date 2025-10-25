import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';
import { Task, User } from '../types';

interface TasksSectionProps {
  currentUser: User | null;
  tasks: Task[];
  onToggleTask: (id: string) => void;
}

export default function TasksSection({ currentUser, tasks, onToggleTask }: TasksSectionProps) {
  const userTasks = tasks.filter(t => t.tag === currentUser);

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-3xl font-bold gradient-text">Задачи</h2>
      <div className="space-y-3">
        {userTasks.map(task => (
          <Card key={task.id} className="glass-card p-4 flex items-center gap-4">
            <Checkbox
              checked={task.completed}
              onCheckedChange={() => onToggleTask(task.id)}
            />
            <div className="flex-1">
              <p className={`font-semibold ${task.completed ? 'line-through opacity-50' : ''}`}>
                {task.title}
              </p>
              {task.exclusive && <span className="text-xs gradient-text">Эксклюзивное</span>}
            </div>
          </Card>
        ))}
      </div>
      <p className="text-sm opacity-70">
        Для добавления задач напишите в поддержку, с просьбой добавить
      </p>
      <Button onClick={() => window.open('https://t.me/AductProduct_bot', '_blank')}>
        <Icon name="MessageCircle" size={18} className="mr-2" />
        Тех. поддержка
      </Button>
    </div>
  );
}
