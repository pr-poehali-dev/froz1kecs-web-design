import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface ManualsSectionProps {
  manualDetailId: string | null;
  onManualDetailChange: (id: string | null) => void;
}

const manuals = [
  { id: '1', title: 'Важная информация', subtitle: 'Смотри и задавай вопросы' },
  { id: '2', title: 'Ютуберы по Холиворлд', subtitle: 'Если скучно, загляни сюда' },
  { id: '3', title: 'О вайпах', subtitle: 'Что нужно знать о вайпах' },
  { id: '4', title: 'О платформе', subtitle: 'Смотри и пойми как это работает' },
];

export default function ManualsSection({ manualDetailId, onManualDetailChange }: ManualsSectionProps) {
  if (manualDetailId) {
    return (
      <div className="animate-fade-in">
        <Button variant="ghost" onClick={() => onManualDetailChange(null)} className="mb-4">
          <Icon name="ArrowLeft" size={20} className="mr-2" />
          Назад
        </Button>
        {manualDetailId === '1' && (
          <Card className="glass-card p-8">
            <h2 className="text-2xl font-bold mb-4 gradient-text">Важная информация</h2>
            <p className="mb-2 text-sm opacity-70">Опубликовал moondar1nka 17.08.25 · Обновлено 20.08.25</p>
            <p className="text-lg">
              Привет! Добро пожаловать в клан froz1kecs! Играй и веселись вместе с нами, мы всегда рады!
            </p>
          </Card>
        )}
        {manualDetailId === '2' && (
          <Card className="glass-card p-8">
            <h2 className="text-2xl font-bold mb-4 gradient-text">Ютуберы по Холиворлд</h2>
            <p className="mb-4 text-sm opacity-70">Опубликовал moondar1nka 17.08.25 · Обновлено 18.08.25</p>
            <h3 className="text-xl font-bold gradient-text mb-3">Самые активные:</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-6">
              {['Bloodu455', 'Векси', 'Дедлонели', 'Дедли', 'Sardo', 'Onlyy', 'Lairy', 'Sweazy', 'Стафи', 'Tops Xops', 'ЛАКС', 'Irbby'].map(name => (
                <Button key={name} variant="outline" size="sm" className="text-xs">
                  {name}
                </Button>
              ))}
            </div>
            <p className="text-sm opacity-70">
              Если ты хочешь быть в этом списке, то можешь просто снимать ролики на Лайт Анархии и выкладывать на Ютуб.
            </p>
          </Card>
        )}
        {manualDetailId === '3' && (
          <Card className="glass-card p-8">
            <h2 className="text-2xl font-bold mb-4 gradient-text">О вайпах</h2>
            <p className="mb-2 text-sm opacity-70">Опубликовал moondar1nka 17.08.25 · Обновлено 3.10.25</p>
            <p className="text-lg">Вайп 19.09.25:</p>
            <p className="text-lg">Следующий —.—.25:</p>
          </Card>
        )}
        {manualDetailId === '4' && (
          <Card className="glass-card p-8">
            <h2 className="text-2xl font-bold mb-4 gradient-text">О платформе</h2>
            <p className="mb-2 text-sm opacity-70">Опубликовал moondar1nka 17.08.25 · Обновлено 3.10.25</p>
            <p className="text-lg">
              Это платформа для клана froz1kecs для удобства и развлечений.
            </p>
          </Card>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <h2 className="text-3xl font-bold gradient-text">Мануалы</h2>
      {manuals.map(manual => (
        <Card
          key={manual.id}
          className="glass-card p-6 cursor-pointer hover-scale"
          onClick={() => onManualDetailChange(manual.id)}
        >
          <h3 className="text-xl font-semibold mb-1">{manual.title}</h3>
          <p className="text-sm opacity-70">{manual.subtitle}</p>
        </Card>
      ))}
    </div>
  );
}
