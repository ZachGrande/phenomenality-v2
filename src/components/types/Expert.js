import expert from '../../assets/imposter-types/expert.svg';
import '../../styles/Types.sass';

function Expert() {
  return(
    <div className="imposter-content">
      <h1>the expert</h1>
      <img className="page-image" src={expert} alt="expert icon"/>
      <h2>overview</h2>
        <p>
          The expert represents a person with imposter phenomenon that never
          feels good enough despite valid qualifications. This
          person may feel like they are less experienced than their 
          colleagues if they do not know an answer or have knowledge on 
          certain topics.
        </p>
        <pre></pre>
        <div className="float-video">
          <iframe aria-label="Expert overview" width="560" height="315" src="https://www.youtube.com/embed/MFd7I4iWeTg?start=111" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
      <h2>general tips</h2>
        <ul>
          <li>
            It's true that there's always more to learn. Going beyond what's expected of you at work can help you excel professionally and get noticed in a competitive job market.
             Taken too far, the
            tendency to endlessly seek out more information can actually be a 
            form of procrastination.
          </li>
          <li>
            Start practicing just-in-time learning. This means acquiring a skill
            when you need it–for example, if your responsibilities change–rather
            than hoarding knowledge for (false) comfort.
          </li>
          <li>
            Realize there's no shame in asking for help when you need it. If you don't
            know how to do something, ask a coworker. If you can't figure out how to
            solve a problem, seek advice from a supervisor, or even a career
            coach. Mentoring junior colleagues or volunteering can be a great way to 
            discover your inner expert. When you share what you know, it not only benefits others, but also helps you redirect your fraudulent feelings.
          </li>
        </ul>
      <h2>resources</h2>
        <ul>
          <li>
            <a href="https://www.fastcompany.com/3062984/a-guide-to-uncertainty-for-people-who-hate-not-knowing">A Guide To Uncertainty For People Who Hate Not Knowing</a>
          </li>
          <li>
            <a href="https://www.lifehack.org/620152/the-art-of-not-knowing">The Art of Not Knowing</a>
          </li>
        </ul>
      <h2>quotes</h2>
        <blockquote>
          "Every time I was called on in class, I was sure that I was
          about to embarrass myself. Every time I took a test, I was 
          sure that it had gone badly. And every time I didn't embarrass
           myself — or even excelled — I believed that I had fooled everyone 
           yet again. One day soon, the jig would be up..."
        </blockquote>
        <cite>
          — Sheryl Sandberg, Chief Operating Officer of Facebook
        </cite>
    </div>
  )
}

export default Expert;