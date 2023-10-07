import styles from './NotFoundBlock.module.scss';

const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>🔍</span>
        <br />
        Ничего не найдено
      </h1>
      <p className={styles.info}>К сожалению, данная страница отсутствует. Проверьте корректность ссылки</p>
    </div>
  );
};

export default NotFoundBlock;
