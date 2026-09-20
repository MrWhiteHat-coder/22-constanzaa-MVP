import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { DishQuickView } from './components/DishQuickView'
import { MotionConfig } from 'motion/react'
import { SavedProvider } from './hooks/useSavedDishes'
import { ToastProvider } from './hooks/useToast'
import { ScrollManager } from './components/ScrollManager'
import { Header } from './sections/Header'
import { MobileActionBar } from './sections/MobileActionBar'
import { Footer } from './sections/Footer'
import { SavedDrawer } from './components/SavedDrawer'
import { HomePage } from './pages/HomePage'
import { MenuPage } from './pages/MenuPage'
import { BookPage } from './pages/BookPage'
import { NotFoundPage } from './pages/NotFoundPage'

export default function App() {
  const [tableOpen, setTableOpen] = useState(false)
  const [viewingDish, setViewingDish] = useState(null)

  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <SavedProvider>
          <ToastProvider>
            <div className="grain flex min-h-dvh flex-col">
              <ScrollManager />
              <Header onOpenTable={() => setTableOpen(true)} />

              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/menu" element={<MenuPage />} />
                <Route path="/book" element={<BookPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>

              <Footer />
              <MobileActionBar />

              <SavedDrawer
                open={tableOpen}
                onClose={() => setTableOpen(false)}
                onViewDish={setViewingDish}
              />
              <DishQuickView
                dish={viewingDish}
                onClose={() => setViewingDish(null)}
                onSelect={setViewingDish}
              />
            </div>
          </ToastProvider>
        </SavedProvider>
      </BrowserRouter>
    </MotionConfig>
  )
}
