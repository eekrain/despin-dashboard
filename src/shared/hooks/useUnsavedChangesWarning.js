import React, { useState, useEffect } from "react";
import { Prompt } from "react-router-dom";

function useUnsavedChangesWarning(
  message = "Data wasn't saved, do u really want to refresh the page?"
) {
  const [isDirty, setDirty] = useState(false);

  useEffect(() => {
    window.onbeforeunload = isDirty && (() => message);

    return () => {
      window.onbeforeunload = null;
    };
  }, [isDirty, message]);

  const routerPrompt = <Prompt when={isDirty} message={message} />;

  return [routerPrompt, () => setDirty(true), () => setDirty(false)];
}

export default useUnsavedChangesWarning;
