import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

const items = [
  { name: 'Сброка модов на 1.20.1', url: 'https://drive.google.com/file/d/1UR22Lhh1bwuq1nZteAGrbCKrb_9Klr0E/view?usp=sharing' },
  { name: 'Сброка модов на 1.21.4', url: 'https://drive.google.com/file/d/1J0XE8uKbAtIwTg_yZN1KJBN8MRwRF5hc/view?usp=sharing' },
  { name: 'GeenPack', url: 'https://drive.google.com/file/d/1V4lHZxaUByoU5wO7lT47DUcs_A3MDD6S/view?usp=sharing' },
  { name: 'Рп дедлонели', url: 'https://drive.google.com/file/d/1L_dMuOmOmafyGljEAL1Wbeb-RGhndx3E/view?usp=drivesdk', rare: true },
];

export default function ShopSection() {
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-3xl font-bold gradient-text">Магазин</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item, idx) => (
          <Card key={idx} className="glass-card p-6">
            <h3 className={`text-lg font-semibold mb-4 ${item.rare ? 'gradient-text' : ''}`}>
              {item.name}
              {item.rare && <span className="block text-sm gradient-text">Редкий товар</span>}
            </h3>
            <Button onClick={() => {
              toast.success('Оплата прошла успешно!');
              setTimeout(() => window.open(item.url, '_blank'), 500);
            }}>
              Получить
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
