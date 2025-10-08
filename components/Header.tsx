import React from 'react'
import { Button } from './ui/button'
import { LogOut } from 'lucide-react'

const Header = ({logoutUser}: {logoutUser: () => void}) => {
  return (
    <header className="backdrop-blur-md bg-background/60 sticky top-0 z-10 border-b border-border">
        <div className="max-w-full mx-auto flex items-center justify-between px-6 py-4">
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            Envision
          </h1>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            onClick={logoutUser}
          >
            <LogOut className="w-4 h-4" />
            Log Out
          </Button>
        </div>
      </header>
  )
}

export default Header