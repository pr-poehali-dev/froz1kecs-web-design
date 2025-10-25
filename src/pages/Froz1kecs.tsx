import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import { User, userData, initialTasks, Task } from '@/components/froz1kecs/types';
import LoginScreen from '@/components/froz1kecs/LoginScreen';
import AutumnPrompt from '@/components/froz1kecs/AutumnPrompt';
import Sidebar from '@/components/froz1kecs/Sidebar';
import HomeSection from '@/components/froz1kecs/sections/HomeSection';
import NewsSection from '@/components/froz1kecs/sections/NewsSection';
import AccountSection from '@/components/froz1kecs/sections/AccountSection';
import TasksSection from '@/components/froz1kecs/sections/TasksSection';
import ShopSection from '@/components/froz1kecs/sections/ShopSection';
import ManualsSection from '@/components/froz1kecs/sections/ManualsSection';
import SettingsSection from '@/components/froz1kecs/sections/SettingsSection';
import AboutSection from '@/components/froz1kecs/sections/AboutSection';

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

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  if (showAutumnPrompt) {
    return <AutumnPrompt onChoice={handleAutumnChoice} />;
  }

  if (!isLoggedIn) {
    return (
      <LoginScreen
        loginNick={loginNick}
        loginPassword={loginPassword}
        setLoginNick={setLoginNick}
        setLoginPassword={setLoginPassword}
        onLogin={handleLogin}
      />
    );
  }

  return (
    <div className={`min-h-screen bg-black text-white theme-${theme}`}>
      {autumnMode && <div id="autumn-leaves" className="autumn-container" />}
      
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="fixed top-4 left-4 z-50 p-3 glass-card rounded-lg hover-scale"
      >
        <Icon name={menuOpen ? 'X' : 'Menu'} size={24} />
      </button>

      <Sidebar
        menuOpen={menuOpen}
        currentSection={currentSection}
        onSectionChange={setCurrentSection}
        onClose={() => setMenuOpen(false)}
      />

      <div className="max-w-4xl mx-auto p-6 pt-20">
        {currentSection === 'home' && <HomeSection currentUser={currentUser} tasks={tasks} />}
        {currentSection === 'news' && (
          <NewsSection newsDetailId={newsDetailId} onNewsDetailChange={setNewsDetailId} />
        )}
        {currentSection === 'account' && <AccountSection currentUser={currentUser} />}
        {currentSection === 'tasks' && (
          <TasksSection currentUser={currentUser} tasks={tasks} onToggleTask={toggleTask} />
        )}
        {currentSection === 'shop' && <ShopSection />}
        {currentSection === 'manuals' && (
          <ManualsSection manualDetailId={manualDetailId} onManualDetailChange={setManualDetailId} />
        )}
        {currentSection === 'settings' && <SettingsSection theme={theme} onThemeChange={setTheme} />}
        {currentSection === 'about' && <AboutSection />}
      </div>
    </div>
  );
}
