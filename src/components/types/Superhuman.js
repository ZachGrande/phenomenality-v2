import superhero from '../../assets/imposter-types/superhero.svg';
import '../../css/Types.css';

// Function returns all of page's content
function Superhuman() {
  return(
    <div className="imposter-content">
      <h1>the superhuman</h1>
      <img className="page-image" src={superhero} alt="superhero icon"/>
      <h2>overview</h2>
        <p>
          The superhuman represents a person with imposter phenomenon that struggles with work addiction.
          This person may feel inadequate relative to colleagues and continue to push themselves
          regardless of the consequences on mental, physical and emotional health.
        </p>
        <pre></pre>
        <div className="float-video">
          <iframe aria-label="Superhero overview" width="560" height="315" src="https://www.youtube.com/embed/MFd7I4iWeTg?start=94" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
      <h2>general tips</h2>
        <ul>
          <li>
            Imposter workaholics are actually addicted to the validation that comes from working, not to the work
            itself. Start training yourself to veer away from external validation. No one should have more power
            to make you feel good about yourself than you–-even your boss when they give your project the stamp
            of approval.
          </li>
          <li>
            On the flip side, learn to take constructive criticism at face value, not personally.
          </li>
          <li>
            As you become more attuned to internal validation and able to nurture your inner confidence, affirming that
            you are competent and skilled. You'll be able to ease off the gas as you gauge how much work is healthy and rewarding.
          </li>
        </ul>
      <h2>resources</h2>
        <ul>
          <li>
            <a href="https://fairygodboss.com/articles/5-ways-to-combat-your-need-for-constant-validation-at-work">5 Ways to Combat Your Need For Constant Validation at Work</a>
          </li>
          <li>
            <a href="https://www.livewellwithsharonmartin.com/validate-yourself/">17 Ways to Validate Yourself</a>
          </li>
        </ul>
      <h2>quotes</h2>
        <blockquote>
          "I have spent my years since Princeton, while at law school and in my various professional jobs, not 
          feeling completely a part of the worlds I inhabit. I am always looking over my shoulder wondering if
          I measure up."
        </blockquote>
        <cite>
          — Sonia Sotomayer, Associate Justice of the Supreme Court of the United States
        </cite>
    </div>
  )
}

export default Superhuman;