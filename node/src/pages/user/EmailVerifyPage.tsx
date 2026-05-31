import { Mail, Send } from "lucide-react";
import toast from "react-hot-toast";
import { resendVerificationEmail } from "../../api/user/auth";

/**
 *  メールアドレス確認ページ
 *  - ユーザー登録後にメールアドレスの確認を促すページ
 *  - 確認メールが送信されたことをユーザーに知らせる
 *  - メール内のリンクをクリックしてメールアドレスの確認が完了する（実装は後で）
 */
export default function EmailVerifyPage() {
  /* メールホグを開く関数 */
  const handleOpneMailHog = () => {
    window.open("http://localhost:8025", "_blank");
  };

  const handleResendEmail = async () => {
    try {
      await resendVerificationEmail();
      toast.success("認証メールを再送しました");
    } catch {
      toast.error(
        "認証メールの再送に失敗しました。時間をおいて再度お試しください。",
      );
    }
  };

  return (
    <main className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-emerald-50 px-6">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-12 shadow-xl">
        <div className="mb-8 flex justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100">
            <Mail className="h-12 w-12 text-green-600" />
          </div>
        </div>

        <h1 className="mb-4 text-center text-4xl font-bold text-gray-900">
          確認メールを送信しました
        </h1>
        <p className="mb-2 text-center text-lg text-gray-600">
          登録していただいたメールアドレスに
        </p>
        <p className="mb-10 text-center text-lg text-gray-600">
          認証メールを送信しました。メール認証を完了してください。
        </p>
        <button
          type="button"
          className="mb-8 flex w-full items-center justify-center gap-3 rounded-xl bg-emerald-600 py-4 text-lg font-semibold text-white transition hover:bg-emerald-700"
          onClick={handleOpneMailHog}
        >
          <Mail size={20} />
          メールを確認する
        </button>
        <div className="border-t pt-8">
          <button
            type="button"
            className="mx-auto flex items-center gap-2 text-base font-medium text-emerald-600 hover:text-emerald-700"
            onClick={handleResendEmail}
          >
            <Send size={18} />
            認証メールを再送する
          </button>
        </div>
      </div>
    </main>
  );
}
