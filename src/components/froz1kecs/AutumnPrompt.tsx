import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface AutumnPromptProps {
  onChoice: (choice: boolean) => void;
}

export default function AutumnPrompt({ onChoice }: AutumnPromptProps) {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <Card className="glass-card p-8 max-w-md text-center space-y-6 animate-scale-in">
        <h2 className="text-2xl font-bold gradient-text">Установить Осеннюю Атмосферу?</h2>
        <p className="text-sm opacity-70">Атмосферы обновляются 5 раз в год.</p>
        <div className="flex gap-4">
          <Button onClick={() => onChoice(true)} className="flex-1">
            Да, установить
          </Button>
          <Button onClick={() => onChoice(false)} variant="outline" className="flex-1">
            Нет, оставить обычную
          </Button>
        </div>
      </Card>
    </div>
  );
}
