import Styles from '../styles/ManaBar.module.scss'

export default () => {
    const step = 10
    const lines = []

    for (let i = 0; i < (100 / step) + 1; i++) {
        lines.push(
            <div className={Styles.line} style={{
                top: `calc(${i * step}% - 1px)`,
            }}>
                <span>{100 - i * step}%</span>
            </div>
        )
    }

    return (
        <div className={Styles.holder}>
            <div className={Styles.inner}>
                {lines}
            </div>
        </div>
    )
}