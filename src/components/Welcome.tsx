import useTranslation from "@/hooks/useTranslation";

const Welcome = () => {
  const { t } = useTranslation();
  return <div>{t("home.title")}</div>;
};

export default Welcome;
