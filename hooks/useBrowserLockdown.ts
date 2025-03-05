import { updateStudentSwitchTabCount } from "@/actions/examActions";
import { useEffect, useState } from "react";

const useBrowserLockdown = ({
  examId,
  studentUserId,
  studentSwitchTabCount,
  studentTimeLeft,
  handleSubmitExam,
}: {
  examId: string;
  studentUserId: string;
  studentSwitchTabCount: number;
  studentTimeLeft: number;
  handleSubmitExam: () => void;
}) => {
  const [isTabSwitched, setIsTabSwitched] = useState(false);
  const [switchTabCount, setSwitchTabCount] = useState(studentSwitchTabCount);

  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (document.hidden) {
        setIsTabSwitched(true);
        setSwitchTabCount((curr) => curr + 1);

        if (switchTabCount) {
          handleSubmitExam();
          return;
        }
        if (studentTimeLeft) {
          await updateStudentSwitchTabCount(examId, studentUserId);
        }
      }
    };

    const handleWindowBlur = async () => {
      setIsTabSwitched(true);
      setSwitchTabCount((curr) => curr + 1);
      if (switchTabCount) {
        handleSubmitExam();
        return;
      }
      if (studentTimeLeft) {
        await updateStudentSwitchTabCount(examId, studentUserId);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleWindowBlur);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleWindowBlur);
    };
  }, [
    examId,
    handleSubmitExam,
    studentTimeLeft,
    studentUserId,
    switchTabCount,
  ]);

  return { isTabSwitched, setIsTabSwitched, switchTabCount };
};

export default useBrowserLockdown;
