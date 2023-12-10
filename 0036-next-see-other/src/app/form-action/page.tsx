const FormActionPage = () => {
  return (
    <main>
      <form
        action={"/form-action/submit"}
        method="POST"
        className="grid gap-4 border border-slate-700 rounded m-4 p-4"
      >
        <button
          className="border border-slate-700 rounded-sm text-slate-700 p-2"
          type="submit"
        >
          Post Text
        </button>
      </form>
    </main>
  );
};

export default FormActionPage;
