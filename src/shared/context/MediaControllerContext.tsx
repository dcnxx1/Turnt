import {ReactNode, createContext, useContext, useState} from 'react';

type PropsMediaControllerContext = {};

const ContextMediaController = createContext({} as PropsMediaControllerContext);

const useMediaController = () => {
  const context = useContext(ContextMediaController);
  if (!context) {
    throw new Error('useMediaController needs to be used within its context!');
  }
  return context;
};

type MediaControllerContextProps = {
  children: ReactNode;
};
export default function MediaControllerContext({
  children,
}: MediaControllerContextProps) {
  const [progress, setProgress] = useState();

  return (
    <ContextMediaController.Provider value={''}>
      {children}
    </ContextMediaController.Provider>
  );
}
