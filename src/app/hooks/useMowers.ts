import { useState, useMemo } from 'react';
import { fileContentSchema } from '../../domain/parser';
import { executeCommands } from '../../domain/commands';
import type { MowerState } from '../../domain/commands';

export const useMowers = () => {
  const [fileContent, setFileContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const parsedData = useMemo(() => {
    if (!fileContent) {
      return null;
    }
    const result = fileContentSchema.safeParse(fileContent);
    if (result.success) {
      setError(null);
      return result.data;
    } else {
      setError(result.error.issues[0].message);
      return null;
    }
  }, [fileContent]);

  const mowerHistories = useMemo((): MowerState[][] | null => {
    if (!parsedData) {
      return null;
    }

    try {
      return parsedData.mowersAndCommands.map(({ mower, commands }) =>
        executeCommands(mower, commands, parsedData.lawn)
      );
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
      return null;
    }
  }, [parsedData]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result;
        if (typeof text === 'string') {
          setFileContent(text);
        }
      };
      reader.readAsText(file);
    }
  };

  // Accepts a File directly (for drag-and-drop)
  const handleFileDrop = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result;
      if (typeof text === 'string') {
        setFileContent(text);
      }
    };
    reader.readAsText(file);
  };

  return {
    handleFileChange,
    handleFileDrop,
    mowerHistories,
    error,
    parsedData,
  };
}; 