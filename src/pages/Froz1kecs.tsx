import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

type User = 'moondar1nka' | 'CuLflame';

interface UserData {
  nick: string;
  privilege: string;
  role: string;
  password: string;
}

interface Task {
  id: string;
  title: string;
  tag: string;
  completed: boolean;
  exclusive?: boolean;
}

const userData: Record<User, UserData> = {
  moondar1nka: {
    nick: 'moondar1nka',
    privilege: 'Stinger (∞)',
    role: 'Admin',
    password: 'ArtPlay2SO',
  },
  CuLflame: {
    nick: 'CuLflame',
    privilege: 'Dragon',
    role: 'Player',
    password: 'KLIP223D',
  },
};

const initialTasks: Task[] = [
  { id: '1', title: 'Заработать 10кк', tag: 'moondar1nka', completed: false },
  { id: '2', title: 'Построить ферму', tag: 'moondar1nka', completed: false },
  { id: '3', title: 'Собрать сет', tag: 'moondar1nka', completed: false },
  { id: '4', title: 'Заработать 100кк', tag: 'moondar1nka', completed: false, exclusive: true },
];

export default function Froz1kecs() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loginNick, setLoginNick] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState('home');
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [autumnMode, setAutumnMode] = useState(false);
  const [showAutumnPrompt, setShowAutumnPrompt] = useState(false);
  const [theme, setTheme] = useState('default');
  const [newsDetailId, setNewsDetailId] = useState<string | null>(null);
  const [manualDetailId, setManualDetailId] = useState<string | null>(null);

  useEffect(() => {
    if (autumnMode) {
      const leafCount = 20;
      const container = document.getElementById('autumn-leaves');
      if (!container) return;

      for (let i = 0; i < leafCount; i++) {
        const leaf = document.createElement('div');
        leaf.className = 'autumn-leaf';
        leaf.style.left = `${Math.random() * 100}%`;
        leaf.style.animationDelay = `${Math.random() * 5}s`;
        leaf.style.animationDuration = `${5 + Math.random() * 5}s`;
        container.appendChild(leaf);
      }

      return () => {
        if (container) container.innerHTML = '';
      };
    }
  }, [autumnMode]);

  const handleLogin = () => {
    const user = Object.entries(userData).find(
      ([_, data]) => data.nick === loginNick && data.password === loginPassword
    );

    if (user) {
      setCurrentUser(user[0] as User);
      setIsLoggedIn(true);
      setShowAutumnPrompt(true);
    } else {
      toast.error('Неверный логин или пароль');
    }
  };

  const handleAutumnChoice = (choice: boolean) => {
    setAutumnMode(choice);
    setShowAutumnPrompt(false);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 6) return 'Доброй ночи';
    if (hour < 12) return 'Доброе утро';
    if (hour < 18) return 'Добрый день';
    return 'Добрый вечер';
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const renderHome = () => {
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
  };

  const renderNews = () => {
    const news = [
      {
        id: '1',
        title: 'Вайп Лайт анархий - 24.10.25',
        detail: 'Вайп состоялся 24 октября 2025 года. Все игроки начинают с нуля. Удачи в новом сезоне!',
      },
      {
        id: '2',
        title: 'Обновление платформы',
        detail: 'Платформа клана froz1kecs была обновлена. Добавлены новые функции и улучшен дизайн.',
      },
    ];

    if (newsDetailId) {
      const item = news.find(n => n.id === newsDetailId);
      return (
        <div className="animate-fade-in">
          <Button variant="ghost" onClick={() => setNewsDetailId(null)} className="mb-4">
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Назад
          </Button>
          <Card className="glass-card p-8">
            <h2 className="text-2xl font-bold mb-4 gradient-text">{item?.title}</h2>
            <p className="text-lg">{item?.detail}</p>
          </Card>
        </div>
      );
    }

    return (
      <div className="space-y-4 animate-fade-in">
        <h2 className="text-3xl font-bold gradient-text">Новости</h2>
        {news.map(item => (
          <Card
            key={item.id}
            className="glass-card p-6 cursor-pointer hover-scale"
            onClick={() => setNewsDetailId(item.id)}
          >
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="opacity-70">Нажми чтобы узнать об обновлениях</p>
          </Card>
        ))}
      </div>
    );
  };

  const renderAccount = () => {
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
  };

  const renderTasks = () => {
    const userTasks = tasks.filter(t => t.tag === currentUser);

    return (
      <div className="space-y-6 animate-fade-in">
        <h2 className="text-3xl font-bold gradient-text">Задачи</h2>
        <div className="space-y-3">
          {userTasks.map(task => (
            <Card key={task.id} className="glass-card p-4 flex items-center gap-4">
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => toggleTask(task.id)}
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
  };

  const renderShop = () => {
    const items = [
      { name: 'Сброка модов на 1.20.1', url: 'https://drive.google.com/file/d/1UR22Lhh1bwuq1nZteAGrbCKrb_9Klr0E/view?usp=sharing' },
      { name: 'Сброка модов на 1.21.4', url: 'https://drive.google.com/file/d/1J0XE8uKbAtIwTg_yZN1KJBN8MRwRF5hc/view?usp=sharing' },
      { name: 'GeenPack', url: 'https://drive.google.com/file/d/1V4lHZxaUByoU5wO7lT47DUcs_A3MDD6S/view?usp=sharing' },
      { name: 'Рп дедлонели', url: 'https://drive.google.com/file/d/1L_dMuOmOmafyGljEAL1Wbeb-RGhndx3E/view?usp=drivesdk', rare: true },
    ];

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
  };

  const renderManuals = () => {
    if (manualDetailId) {
      return (
        <div className="animate-fade-in">
          <Button variant="ghost" onClick={() => setManualDetailId(null)} className="mb-4">
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
        </div>
      );
    }

    const manuals = [
      { id: '1', title: 'Важная информация', subtitle: 'Смотри и задавай вопросы' },
      { id: '2', title: 'Ютуберы по Холиворлд', subtitle: 'Если скучно, загляни сюда' },
      { id: '3', title: 'О вайпах', subtitle: 'Что нужно знать о вайпах' },
      { id: '4', title: 'О платформе', subtitle: 'Смотри и пойми как это работает' },
    ];

    return (
      <div className="space-y-4 animate-fade-in">
        <h2 className="text-3xl font-bold gradient-text">Мануалы</h2>
        {manuals.map(manual => (
          <Card
            key={manual.id}
            className="glass-card p-6 cursor-pointer hover-scale"
            onClick={() => setManualDetailId(manual.id)}
          >
            <h3 className="text-xl font-semibold mb-1">{manual.title}</h3>
            <p className="text-sm opacity-70">{manual.subtitle}</p>
          </Card>
        ))}
      </div>
    );
  };

  const renderSettings = () => {
    const themes = [
      { id: 'default', name: 'Черно-белая', color: '#ffffff' },
      { id: 'yellow', name: 'Желтая', color: '#ffd700' },
      { id: 'purple', name: 'Фиолетовая', color: '#9b87f5' },
      { id: 'red', name: 'Красная', color: '#ef4444' },
      { id: 'green', name: 'Зеленая', color: '#22c55e' },
      { id: 'summer', name: 'Летняя', color: '#882aff' },
      { id: 'autumn', name: 'Осенняя', color: '#fbbf24' },
    ];

    return (
      <div className="space-y-6 animate-fade-in">
        <h2 className="text-3xl font-bold gradient-text">Настройки</h2>
        <Card className="glass-card p-6">
          <h3 className="text-xl font-semibold mb-4">Смена темы</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {themes.map(t => (
              <Button
                key={t.id}
                variant={theme === t.id ? 'default' : 'outline'}
                onClick={() => setTheme(t.id)}
                className="justify-start"
              >
                <div
                  className="w-4 h-4 rounded-full mr-2"
                  style={{ backgroundColor: t.color }}
                />
                {t.name}
              </Button>
            ))}
          </div>
        </Card>
      </div>
    );
  };

  const renderAbout = () => (
    <div className="space-y-4 animate-fade-in">
      <h2 className="text-3xl font-bold gradient-text">О сайте</h2>
      <Card className="glass-card p-6 space-y-2 text-sm opacity-80">
        <p>Web by moondar1nka with company AductWork, CrystalXteam</p>
        <p className="gradient-text font-semibold">froz1kecs clan</p>
        <p>join to me at mc.HolyWorld.ru</p>
        <p>2025 product | web version 1.0 (релиз)</p>
        <p className="mt-4">
          Клан froz1kecs - клан на Майнкрафт анархии HolyWorld
        </p>
      </Card>
    </div>
  );

  if (showAutumnPrompt) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <Card className="glass-card p-8 max-w-md text-center space-y-6 animate-scale-in">
          <h2 className="text-2xl font-bold gradient-text">Установить Осеннюю Атмосферу?</h2>
          <p className="text-sm opacity-70">Атмосферы обновляются 5 раз в год.</p>
          <div className="flex gap-4">
            <Button onClick={() => handleAutumnChoice(true)} className="flex-1">
              Да, установить
            </Button>
            <Button onClick={() => handleAutumnChoice(false)} variant="outline" className="flex-1">
              Нет, оставить обычную
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (!isLoggedIn) {
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
            <Button onClick={handleLogin} className="w-full">
              Войти
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const menuItems = [
    { id: 'home', label: 'Главная', icon: 'Home' },
    { id: 'news', label: 'Новости', icon: 'Newspaper' },
    { id: 'account', label: 'Аккаунт', icon: 'User' },
    { id: 'tasks', label: 'Задачи', icon: 'ListTodo' },
    { id: 'shop', label: 'Магазин', icon: 'ShoppingCart' },
    { id: 'manuals', label: 'Мануалы', icon: 'Book' },
    { id: 'settings', label: 'Настройки', icon: 'Settings' },
    { id: 'about', label: 'О сайте', icon: 'Info' },
  ];

  return (
    <div className={`min-h-screen bg-black text-white theme-${theme}`}>
      {autumnMode && <div id="autumn-leaves" className="autumn-container" />}
      
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="fixed top-4 left-4 z-50 p-3 glass-card rounded-lg hover-scale"
      >
        <Icon name={menuOpen ? 'X' : 'Menu'} size={24} />
      </button>

      <div className={`fixed top-0 left-0 h-full w-64 glass-sidebar z-40 transition-transform duration-300 ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 pt-20 space-y-2">
          <h2 className="text-2xl font-bold gradient-text mb-6">froz1kecs</h2>
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentSection(item.id);
                setMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all hover-scale ${
                currentSection === item.id ? 'bg-white/10' : 'hover:bg-white/5'
              }`}
            >
              <Icon name={item.icon as any} size={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 pt-20">
        {currentSection === 'home' && renderHome()}
        {currentSection === 'news' && renderNews()}
        {currentSection === 'account' && renderAccount()}
        {currentSection === 'tasks' && renderTasks()}
        {currentSection === 'shop' && renderShop()}
        {currentSection === 'manuals' && renderManuals()}
        {currentSection === 'settings' && renderSettings()}
        {currentSection === 'about' && renderAbout()}
      </div>
    </div>
  );
}
