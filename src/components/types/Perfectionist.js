import perfectionist from '../../assets/imposter-types/perfectionist.svg';
import '../../styles/Types.sass';

function Perfectionist() {
  return(
    <div className="imposter-content">
      <h1>the perfectionist</h1>
      <img className="page-image" src={perfectionist} alt="pefectionist icon"/>
      <h2>overview</h2>
        <p>
          The perfectionist represents a person with imposter phenomenon that strives to be their absolute 
          best, no matter the cost to their mental health. These individuals may identify as typical 
          “perfectionists” who set impossibly high standards for themselves.
        </p>
        <pre></pre>
        <div className="float-video">
          <iframe aria-label="Perfectionist overview" width="560" height="315" src="https://www.youtube.com/embed/MFd7I4iWeTg?start=80" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
      <h2>general tips</h2>
        <ul>
          <li>
            For this type, success is rarely satisfying because they believe they could always do better. 
            While that drive for perfection may seem admirable from an outsider, it's actually neither productive nor healthy. Owning and celebrating both big and small achievements is essential if you 
            want to avoid burnout and cultivate self-confidence.
          </li>
          <li>
            Learn to take your mistakes in stride, viewing them as a natural part of the growth process.
          </li>
          <li>
            In addition, push yourself to act before you're ready. Force yourself to start the project you've
            been planning for months. Truth is, there will never be the “perfect time,” and your work will never
            be 100% flawless. The sooner you're able to accept that, the better off you'll be.
          </li>
        </ul>
      <h2>resources</h2>
        <ul>
          <li>
            <a href="https://www.themuse.com/advice/12-little-milestones-you-should-be-celebrating-at-work">12 Little Milestones You Should Be Celebrating at Work</a>
          </li>
          <li>
            <a href="https://www.themuse.com/advice/a-realistic-plan-for-telling-your-boss-that-youre-burnt-out-and-need-personal-time">A Realistic Plan for Telling Your Boss That You're Burnt Out and Need Personal Time</a>
          </li>
        </ul>
      <h2>quotes</h2>
        <blockquote>
          "So I have to admit that today, even 12 years after graduation [from Harvard], I'm still insecure about my
           own worthiness. I have to remind myself today, You are here for a reason. Today, I feel much like I did 
           when I came to Harvard Yard as a freshman in 1999 … I felt like there had been some mistake — that I wasn't
           smart enough to be in this company and that every time I opened my mouth I would have to prove I wasn't 
           just a dumb actress. … Sometimes your insecurities and your inexperience may lead you to embrace other 
           people's expectations, standards, or values, but you can harness that inexperience to carve out your own path
           — one that is free of the burden of knowing how things are supposed to be, a path that is defined by its own
           particular set of reasons."
        </blockquote>
        <cite>
          — Natalie Portman, Academy Award Winning Actress
        </cite>
    </div>
  )
}

export default Perfectionist;