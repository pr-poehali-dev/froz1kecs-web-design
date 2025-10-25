import Icon from '@/components/ui/icon';

interface MenuItem {
  id: string;
  label: string;
  icon: string;
}

interface SidebarProps {
  menuOpen: boolean;
  currentSection: string;
  onSectionChange: (section: string) => void;
  onClose: () => void;
}

const menuItems: MenuItem[] = [
  { id: 'home', label: 'Главная', icon: 'Home' },
  { id: 'news', label: 'Новости', icon: 'Newspaper' },
  { id: 'account', label: 'Аккаунт', icon: 'User' },
  { id: 'tasks', label: 'Задачи', icon: 'ListTodo' },
  { id: 'shop', label: 'Магазин', icon: 'ShoppingCart' },
  { id: 'manuals', label: 'Мануалы', icon: 'Book' },
  { id: 'settings', label: 'Настройки', icon: 'Settings' },
  { id: 'about', label: 'О сайте', icon: 'Info' },
];

export default function Sidebar({
  menuOpen,
  currentSection,
  onSectionChange,
  onClose,
}: SidebarProps) {
  return (
    <div className={`fixed top-0 left-0 h-full w-64 glass-sidebar z-40 transition-transform duration-300 ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="p-6 pt-20 space-y-2">
        <h2 className="text-2xl font-bold gradient-text mb-6">froz1kecs</h2>
        {menuItems.map(item => (
          <button
            key={item.id}
            onClick={() => {
              onSectionChange(item.id);
              onClose();
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
  );
}
