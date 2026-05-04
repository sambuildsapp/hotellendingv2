'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export type Scene = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

interface SimulationState {
    currentScene: Scene;
    expandedMCPPanels: Set<string>;
    showAllAnnotations: boolean;
}

interface SimulationContextType extends SimulationState {
    nextScene: () => void;
    prevScene: () => void;
    goToScene: (scene: Scene) => void;
    toggleMCPPanel: (panelId: string) => void;
    toggleAllAnnotations: () => void;
}

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

export function SimulationProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<SimulationState>({
        currentScene: 1,
        expandedMCPPanels: new Set(),
        showAllAnnotations: false,
    });

    const nextScene = () => {
        setState(prev => ({
            ...prev,
            currentScene: Math.min(prev.currentScene + 1, 8) as Scene,
            expandedMCPPanels: new Set(), // Reset panels on scene change
        }));
    };

    const prevScene = () => {
        setState(prev => ({
            ...prev,
            currentScene: Math.max(prev.currentScene - 1, 1) as Scene,
            expandedMCPPanels: new Set(),
        }));
    };

    const goToScene = (scene: Scene) => {
        setState(prev => ({
            ...prev,
            currentScene: scene,
            expandedMCPPanels: new Set(),
        }));
    };

    const toggleMCPPanel = (panelId: string) => {
        setState(prev => {
            const newPanels = new Set(prev.expandedMCPPanels);
            if (newPanels.has(panelId)) {
                newPanels.delete(panelId);
            } else {
                newPanels.add(panelId);
            }
            return { ...prev, expandedMCPPanels: newPanels };
        });
    };

    const toggleAllAnnotations = () => {
        setState(prev => ({
            ...prev,
            showAllAnnotations: !prev.showAllAnnotations,
        }));
    };

    return (
        <SimulationContext.Provider
            value={{
                ...state,
                nextScene,
                prevScene,
                goToScene,
                toggleMCPPanel,
                toggleAllAnnotations,
            }}
        >
            {children}
        </SimulationContext.Provider>
    );
}

export function useSimulation() {
    const context = useContext(SimulationContext);
    if (context === undefined) {
        throw new Error('useSimulation must be used within a SimulationProvider');
    }
    return context;
}
