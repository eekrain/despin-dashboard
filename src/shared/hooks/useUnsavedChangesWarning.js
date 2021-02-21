import React, { useState, useEffect } from "react";
import { Prompt } from "react-router-dom";

function useUnsavedChangesWarning(
  message = "Artikel belum disimpan, jika refresh maka data form akan hilang. Yakin untuk refresh?"
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
