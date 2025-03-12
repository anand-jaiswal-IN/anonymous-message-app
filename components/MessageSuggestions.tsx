import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown } from "lucide-react";

const listOfMessages = [
  "I really appreciate how you helped me with that project last week. Your attention to detail made a huge difference.",
  "The presentation you gave yesterday was so clear and informative. I especially liked how you handled the questions at the end.",
  "I've noticed how you always make time to listen to everyone's ideas in meetings. That kind of inclusivity creates a better workplace for all of us.",
  "Sometimes your emails come across as a bit abrupt. Adding a greeting or sign-off might help them feel more approachable.",
  "I admire how you stay calm under pressure. The way you handled that crisis last month was truly impressive.",
  "Thank you for mentoring me. The advice you've given has really helped me grow professionally.",
  "I think our team meetings could be more efficient if we had a clearer agenda beforehand.",
  "The positive energy you bring to the office makes such a difference to the work environment.",
  "When you interrupt people during discussions, it makes it difficult for some team members to share their thoughts fully.",
  "Your creative approach to problem-solving has inspired me to think outside the box more often.",
  "I really value your technical expertise. You've taught me so much about optimizing our workflows.",
  "It would be helpful if you could respond to messages a bit more promptly, especially when others are waiting on your input to move forward.",
  "The way you recognized my contribution to the project in front of the team meant a lot to me. Thank you for that.",
  "I think our classroom discussions would benefit from more structure to ensure everyone gets a chance to participate.",
  "Your lectures are incredibly engaging, but sometimes the pace is a bit too fast to take comprehensive notes.",
  "I appreciate how accessible you make yourself to students who need extra help. It shows how much you care about our success.",
  "The way you organize information on the slides makes complex concepts much easier to understand.",
  "Sometimes it feels like there's an imbalance in how attention is distributed in our team. I'd love to have more opportunities to contribute.",
  "Your commitment to quality is evident in everything you do. It motivates me to hold myself to a higher standard too.",
  "I think our friendship would be stronger if we could both work on being better listeners to each other.",
  "The documentation you created for the new system is incredibly helpful and thorough. Thank you for putting in that effort.",
  "When you take over conversations at social gatherings, it can make others feel like their presence isn't valued.",
  "Your empathy and understanding during my difficult time didn't go unnoticed. Thank you for being there.",
  "The way you balance professionalism with approachability makes you an excellent leader.",
  "I think our project would benefit from more frequent check-ins to ensure we're all aligned on priorities.",
  "Your insights during brainstorming sessions are always thoughtful and push our thinking forward.",
  "It would be helpful if meeting materials could be shared earlier to give everyone time to prepare properly.",
  "I really appreciate how you always give credit where it's due instead of claiming others' ideas as your own.",
  "The way you micromanage tasks can sometimes feel like you don't trust us to do our jobs well.",
  "Your willingness to admit when you're wrong and learn from mistakes sets a powerful example for everyone.",
  "The enthusiasm you bring to projects is contagious and helps motivate the whole team.",
  "I notice you often check your phone during our conversations, which makes me feel like you're not fully present.",
  "Your feedback on my work is always constructive and helps me improve without feeling criticized.",
  "The way you defended my idea in the meeting yesterday gave me confidence to speak up more often.",
  "I think our team would benefit from more transparent communication about upcoming changes.",
  "Your patient explanations when I'm struggling to understand a concept have been invaluable to my learning.",
  "Sometimes your jokes in professional settings can come across as inappropriate and make others uncomfortable.",
  "The way you make everyone feel included and valued during team activities creates a wonderful sense of belonging.",
  "Your consistent follow-through on commitments makes you someone everyone can rely on.",
  "I'd appreciate if you could be more mindful of deadlines, as delays impact others who are waiting on your deliverables.",
  "The thoroughness of your code reviews has helped me become a better developer. Thank you for taking the time.",
  "When you dismiss ideas quickly without fully considering them, it discourages people from sharing in the future.",
  "Your ability to simplify complex technical concepts for non-technical stakeholders is truly impressive.",
  "I've noticed you're always willing to help others even when you're busy. That generosity doesn't go unnoticed.",
  "Our study group would be more effective if everyone came prepared having reviewed the material beforehand.",
  "The way you've welcomed new team members and helped them integrate has created a more cohesive group.",
  "When you take credit for collaborative work, it diminishes the contributions others have made.",
  "Your proactive approach to identifying potential issues before they become problems has saved us so much time.",
  "I really value how you're willing to have difficult conversations directly rather than avoiding them.",
  "It would be helpful if you could be more open to alternative approaches rather than insisting on doing things your way.",
];

export default function MessagePagination({
  setMessage,
}: {
  setMessage: (message: string) => void;
}) {
  const [startIndex, setStartIndex] = useState(0);
  const messagesPerPage = 3;

  const handleNext = () => {
    if (startIndex + messagesPerPage < listOfMessages.length) {
      setStartIndex(startIndex + messagesPerPage);
    }
  };

  const handlePrev = () => {
    if (startIndex - messagesPerPage >= 0) {
      setStartIndex(startIndex - messagesPerPage);
    }
  };

  return (
    <div className="flex flex-col items-center py-4">
      <Button
        variant="outline"
        onClick={handlePrev}
        disabled={startIndex === 0}
        className="w-full"
      >
        <ChevronUp />
      </Button>
      <div className="">
        {listOfMessages
          .slice(startIndex, startIndex + messagesPerPage)
          .map((message, index) => (
            <div
              className="p-2 border rounded my-2 hover:bg-accent cursor-pointer"
              key={index}
              onClick={() => setMessage(message)} // Set textarea value on click
            >
              {message}
            </div>
          ))}
      </div>
      <Button
        variant="outline"
        onClick={handleNext}
        disabled={startIndex + messagesPerPage >= listOfMessages.length}
        className="w-full"
      >
        <ChevronDown />
      </Button>
    </div>
  );
}
